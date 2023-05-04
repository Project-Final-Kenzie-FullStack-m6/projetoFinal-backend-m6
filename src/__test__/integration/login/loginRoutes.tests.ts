import request from "supertest";
import { DataSource } from "typeorm";
import  app  from "../../../app";
import AppDataSource from "../../../data-source";
import {  mockedUpdateUserCreate, mockedUserCreate } from "../../mocks/user.mocks";
import { mockedUpdateUserLogin, mockedWrongFields, mockedWrongLogin } from "../../mocks/login.mocks";


describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(mockedUserCreate);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST /login, Should be able to login", async () => {
    const response = await request(app).post("/login").send(mockedUserCreate);
    expect(response.body).toHaveProperty("token");
    expect(response.statusCode).toBe(200);
  });

  test("POST /login, Should not be able to login with email or password invalid", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockedWrongLogin);
    expect(response.body).not.toHaveProperty("token");
    expect(response.statusCode).toBe(401);
  });

  test("POST /login, Should not be able to login if field is empty or wrong", async () => {
    const response = await request(app)
      .post("/login")
      .send(mockedWrongFields);

    expect(response.body).not.toHaveProperty("token");
    expect(response.statusCode).toBe(400);
  });

  test("POST /login, Should not be able to login with isActive = false", async () => {
    const userToDeleteResponse = await request(app)
      .post("/users")
      .send(mockedUpdateUserCreate);
    
    const loginResponse = await request(app)
    .post("/login")
    .send(mockedUpdateUserLogin)

    await request(app)
      .delete(`/users/${userToDeleteResponse.body.id}`)
      .set("Authorization", `Bearer ${loginResponse.body.token}`);

    const response = await request(app)
      .post("/login")
      .send(mockedUpdateUserLogin);
    expect(response.body).not.toHaveProperty("token");
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});