import request from "supertest";
import app from "../../../app"
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import { mockedLogin, mockedSellerLogin, mockedUpdateUserLogin } from "../../mocks/login.mocks";
import { mockedSellerCreate, mockedUserCreate } from "../../mocks/user.mocks";
import { mockedAdversimentCreate, mockedAdversimentToUpdate } from "../../mocks/adversiment.mocks";



describe("/adversiments", () => {
    let connection: DataSource;

    beforeAll(async () => {
        await AppDataSource.initialize()
            .then((res) => {
                connection = res;
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err);
            });
        await request(app).post("/users").send(mockedSellerCreate);
    });

    afterAll(async () => {
        await connection.destroy();
    });

    test("POST /adversiments - Should be able to create a adversiment", async () => {
        const loginResponse = await request(app).post("/login").send(mockedSellerLogin)

        const response = await request(app).post("/adversiment")
            .send(mockedAdversimentCreate)
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("brand");
        expect(response.body).toHaveProperty("model");
        expect(response.body).toHaveProperty("age");
        expect(response.body).toHaveProperty("fueltype");
        expect(response.body).toHaveProperty("mileage");
        expect(response.body).toHaveProperty("price");
        expect(response.body).toHaveProperty("color");
        expect(response.body).toHaveProperty("fipe");
        expect(response.body).toHaveProperty("isActive");
        expect(response.body).toHaveProperty("images");
        expect(response.body.images[0]).toHaveProperty("imageUrl");
        expect(response.body.user).toHaveProperty("id");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body.color).toEqual("vermelho");
        expect(response.body.isActive).toEqual(true);
        expect(response.status).toBe(201);
    })
    test("POST /adversiments - Should not be able to create a adversiment without authentication", async () => {
        const response = await request(app).post("/adversiments").send(mockedAdversimentCreate);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    });
    test("POST /adversiments - Should not be able to create a adversiment without isSeller equal to true", async () => {
        const notSeller = await request(app).post("/users").send(mockedUserCreate);
        const notSellerLogin = await request(app).post("/login").send(mockedLogin)
        const response = await request(app).post("/adversiments").send(mockedAdversimentCreate).set("Authorization", `Bearer ${notSellerLogin.body.token}`);;

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(409);
    });
    test("GET /adversiments - Must be able to list adversiments", async () => {
        const response = await request(app)
            .get("/adversiments")

        expect(response.body).toHaveLength(1);
    });
    test("GET /adversiment/:id - Must be able to list adversiment by Id", async () => {
        const users = await request(app)
            .get("/adversiment")
        const response = await request(app)
            .get(`/adversiment/${users.body.users[0].id}`)

        expect(response.body).toHaveProperty("id");
        expect(response.body).toHaveProperty("brand");
        expect(response.body).toHaveProperty("model");
        expect(response.body).toHaveProperty("age");
        expect(response.body).toHaveProperty("fueltype");
        expect(response.body).toHaveProperty("mileage");
        expect(response.body).toHaveProperty("price");
        expect(response.body).toHaveProperty("color");
        expect(response.body).toHaveProperty("fipe");
        expect(response.body).toHaveProperty("isActive");
        expect(response.body).toHaveProperty("images");
        expect(response.body.images[0]).toHaveProperty("imageUrl");
        expect(response.body.user).toHaveProperty("id");
        expect(response.body).toHaveProperty("createdAt");
        expect(response.body).toHaveProperty("updatedAt");
        expect(response.body.color).toEqual("vermelho");
        expect(response.body.isActive).toEqual(true);
        expect(response.status).toBe(200);
    });
    test("PATCH /adversiments - Should not be able to update a adversiment without authentication", async () => {
        const adversimentToUpdate = await request(app)
            .get("/adversiments")

        const response = await request(app).patch(
            `/adversiments/${adversimentToUpdate.body.id}`
        );

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });
    test("PATCH /adversiments - Should not be able to update a adversiment with invalid id", async () => {
        const newData = { brand: "BMW", color: "azul" };

        const loginResponse = await request(app)
            .post("/login")
            .send(mockedSellerCreate);

        const response = await request(app)
            .patch(`/adversiments/olhaotesteeeeee`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send(newData);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(400);
    });
    test("PATCH /adversiments - Should not be able to update a adversiment if you not owner", async () => {
        const newData = { brand: "BMW", color: "azul" };

        const adversimentToUpdate = await request(app)
            .get("/adversiments")

        const loginResponse = await request(app)
            .post("/login")
            .send(mockedLogin);

        const response = await request(app)
            .patch(`/adversiments/${adversimentToUpdate[0].id}`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send(newData);

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });
    test("PATCH /adversiments - Should be able to update adversiments", async () => {
        const loginResponse = await request(app)
            .post("/login")
            .send(mockedSellerLogin);
        const adversimentToUpdate = await request(app)
            .post("/adiversiments")
            .send(mockedAdversimentToUpdate)
            .set("Authorization", `Bearer ${loginResponse.body.token}`);


        const updateResponse = await request(app)
            .patch(`/adversiments/${adversimentToUpdate.body.id}`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`)
            .send({
                color: "verde",
                price: 55000,
            });

        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.color).toBe("verde")
        expect(updateResponse.body).toHaveProperty("message");
    });
    test("DELETE /adversiments - Should not be able to delete adversiment without authentication", async () => {
        const adversimentTobeDeleted = await request(app)
            .get("/adversiments");

        const response = await request(app).delete(
            `/adversiments/${adversimentTobeDeleted.body[0].id}`
        );

        expect(response.body).toHaveProperty("message");
        expect(response.status).toBe(401);
    });
    test("DELETE /adversiments - Should be able to soft delete a adversiment", async () => {
        const adversimentTobeDeleted = await request(app)
            .get("/adversimnets")

        const loginResponse = await request(app)
            .post("/login")
            .send(mockedSellerCreate);

        const response = await request(app)
            .delete(`/adversiments/${adversimentTobeDeleted.body[0].id}`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`);
        expect(response.status).toBe(204);
    });
    test("DELETE /adversiments - Should not be able to delete a adversiment with isActive = false", async () => {
        const adversimentTobeDeleted = await request(app)
            .get("/adversiments")

        const loginResponse = await request(app)
            .post("/login")
            .send(mockedSellerLogin);

        const firstDelete = await request(app)
            .delete(`/adversiments/${adversimentTobeDeleted[1].body.id}`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        const response = await request(app)
            .delete(`/adversiments/${adversimentTobeDeleted[1].body.id}`)
            .set("Authorization", `Bearer ${loginResponse.body.token}`);

        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty("message");
    });

});