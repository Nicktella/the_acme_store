const {
    client,
    createTables,
    createUser,
    createProduct,
    fetchUsers,
    fetchProducts,
    createFavorite,
    fetchFavorites,
    destroyFavorite,
} = require("./db");

const express = require("express");
const app = express();

app.use(express.json());
app.use(require("morgan")("dev"));

app.get("/api/users", async (req, res, next) => {
    try {
        res.send(await fetchUsers());
    } catch (error) {
        next(error);
    }
});

app.get("/api/products", async (req, res, next) => {
    try {
        res.send(await fetchProducts());
    } catch (error) {
        next(error);
    }
});

app.get("/api/users/:id/favorites", async (req, res, next) => {
    try {
        res.send(await fetchFavorites(req.params.id));
    } catch (error) {
        next(error);
    }
});

app.post("/api/users/:id/favorites", async (req, res, next) => {
    try {
        const favorite = await createFavorite({
            user_id: req.params.id,
            product_id: req.body.product_id,
        });
        res.status(201).send(favorite);
    } catch (error) {
        next(error);
    }
});

app.delete("/api/users/:userId/favorites/:id", async (req, res, next) => {
    try {
        await destroyFavorite({ user_id: req.params.userId, id: req.params.id });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

const init = async () => {
    await client.connect();

    await createTables();
    console.log("Tables created");

    const [user1, user2, product1, product2] = await Promise.all([
        createUser({ username: "user1", password: "password1" }),
        createUser({ username: "user2", password: "password2" }),
        createProduct("Product A"),
        createProduct("Product B"),
    ]);

    console.log("Data seeded");

    console.log(await fetchUsers());
    console.log(await fetchProducts());

    const favorite1 = await createFavorite({
        user_id: user1.id,
        product_id: product1.id,
    });

    console.log("Favorite created:", favorite1);

    const favorites = await fetchFavorites(user1.id);
    console.log("User 1's favorites:", favorites);

    await destroyFavorite({ user_id: user1.id, id: favorite1.id });

    console.log("Favorite deleted");

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);

        console.log("Some curl commands to test:");
        console.log(`curl localhost:${port}/api/users`);
        console.log(`curl localhost:${port}/api/products`);
        console.log(`curl localhost:${port}/api/users/${user1.id}/favorites`);
        console.log(
            `curl -X POST localhost:${port}/api/users/${user1.id}/favorites -d '{"product_id":"${product2.id}"}' -H "Content-Type:application/json"`
        );
        console.log(
            `curl -X DELETE localhost:${port}/api/users/${user1.id}/favorites/${favorites[0].id}`
        );
    });
};

init();
