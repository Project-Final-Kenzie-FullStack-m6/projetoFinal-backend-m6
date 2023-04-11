import request from "supertest";
import  app  from "../../../app"
import { DataSource } from "typeorm";
import {
  mockedSellerCreate,
  mockedUpdateUserCreate,
  mockedUserCreate,
  mockedUserNotInfoCreate,
} from "../../mocks/user.mocks";
import AppDataSource from "../../../data-source";
import { mockedUpdateUserLogin } from "../../mocks/login.mocks";



describe("/users", () => {
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

  test("POST /users - Should be able to create user", async () => {
    const response = await request(app).post("/users").send(mockedUserCreate);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("birthDate");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("isSeller");
    expect(response.body).toHaveProperty("contact");
    expect(response.body).toHaveProperty("isActive");
    expect(response.body).toHaveProperty("address");
    expect(response.body.address).toHaveProperty("cep");
    expect(response.body.address).toHaveProperty("state");
    expect(response.body.address).toHaveProperty("city");
    expect(response.body.address).toHaveProperty("district");
    expect(response.body.address).toHaveProperty("street");
    expect(response.body.address).toHaveProperty("number");

    expect(response.body).toHaveProperty("createdAt");
    expect(response.body).toHaveProperty("updatedAt");
    expect(response.body.email).toEqual("rafaelS@gmail.com");
    expect(response.body.isSeller).toEqual(false);
    expect(response.body.isActive).toEqual(true);
    expect(response.status).toBe(201);
  });

  test("POST /users - Should not be able to create a user that already exists", async () => {
    const response = await request(app).post("/users").send(mockedUserCreate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(409);
  });

  test("POST /users - Should not be able to create a user with missing fields", async () => {
    const response = await request(app)
      .post("/users")
      .send(mockedUserNotInfoCreate);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("GET /users - Must be able to list users", async () => {
    const response = await request(app)
      .get("/users")

    expect(response.body.users).toHaveLength(2);
    expect(response.body.users[0]).not.toHaveProperty("password");
  });

  test("GET /users - Should not be able to list users without authentication", async () => {
    const response = await request(app).get("/users");

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });


  test("GET /users/:id - Must be able to list user by Id", async () => {
    const users = await request(app)
      .get("/users")
    const response = await request(app)
      .get(`/users/${users.body.users[0].id}`) 

      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("email");
      expect(response.body).not.toHaveProperty("password");
      expect(response.body).toHaveProperty("name");
      expect(response.body).toHaveProperty("birthDate");
      expect(response.body).toHaveProperty("description");
      expect(response.body).toHaveProperty("isSeller");
      expect(response.body).toHaveProperty("contact");
      expect(response.body).toHaveProperty("isActive");
      expect(response.body).toHaveProperty("address");
      expect(response.body.address).toHaveProperty("cep");
      expect(response.body.address).toHaveProperty("state");
      expect(response.body.address).toHaveProperty("city");
      expect(response.body.address).toHaveProperty("district");
      expect(response.body.address).toHaveProperty("street");
      expect(response.body.address).toHaveProperty("number");
  
    expect(response.status).toBe(200);
  });

  test("GET users/:id - Should not be able to list a user with invalid id", async () => {
    const response = await request(app)
      .get(`/users/b855d86b-d4c9-41cd-ab98-d7fa734c6ce4`)

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(404);
  });


  test("PATCH /users - Should not be able to update without authentication", async () => {
    const userToUpdate = await request(app)
      .get("/users")

    const response = await request(app).patch(
      `/users/${userToUpdate.body.users[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("PATCH /users - Should not be able to update with invalid id", async () => {
    const newData = { name: "Teste", email: "teste@mail.com" };

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedSellerCreate);

    const response = await request(app)
      .patch(`/users/olhaotesteeeeee`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send(newData);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  test("PATCH /users - Should not be able to update another user", async () => {
    const newValue = { email: "biribiri@gmail.com" };

    const token = await request(app).post("/login").send(mockedUserCreate);

    const userToUpdate = await request(app)
      .get("/users")
    const response = await request(app)
      .patch(`/users/${userToUpdate.body.users[0].id}`)
      .set("Authorization", `Bearer ${token.body.token}`)
      .send(newValue);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });


  test("PATCH /users - Should be able to update user", async () => {
    const userToUpdate = await request(app)
      .post("/users")
      .send(mockedUpdateUserCreate);

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUpdateUserLogin);

    const updateResponse = await request(app)
      .patch(`/users/${userToUpdate.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`)
      .send({
        email: "updatetest99@mail.com",
        username: "updatedrasfaeu",
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toHaveProperty("message");
  });

  test("DELETE /users - Should not be able to delete user without authentication", async () => {
    const UserTobeDeleted = await request(app)
      .get("/users")

    const response = await request(app).delete(
      `/users/${UserTobeDeleted.body.users[0].id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  test("DELETE /users - Should not be able to delete another user", async () => {
    const userTobeDeleted = await request(app)
      .get("/users")

    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUpdateUserLogin);

    const response = await request(app)
      .delete(`/users/${userTobeDeleted.body.users[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users - Should be able to soft delete user", async () => {
    const userTobeDeleted = await request(app)
      .get("/users")

      const loginResponse = await request(app)
      .post("/login")
      .send(mockedSellerCreate);

    const response = await request(app)
      .delete(`/users/${userTobeDeleted.body.users[0].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);
    expect(response.status).toBe(204);
  });

  test("DELETE /users - Should not be able to delete user with isActive = false", async () => {
    const userTobeDeleted = await request(app)
      .get("/users")

      const loginResponse = await request(app)
      .post("/login")
      .send(mockedUpdateUserLogin);

    const response = await request(app)
      .delete(`/users/${userTobeDeleted.body.users[2].id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("DELETE /users - Should not be able to delete user with invalid id", async () => {
    const loginResponse = await request(app)
      .post("/login")
      .send(mockedUpdateUserLogin);

    const response = await request(app)
      .delete("/users/1")
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});