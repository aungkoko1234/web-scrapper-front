/* eslint-disable no-undef */
/**
 * @jest-environment node
 */
import { createMocks } from "node-mocks-http";
import hanlder from "../../../pages/api/keywords";

describe("/api/keywords API Endpoint", () => {
  function mockRequestResponse(method = "GET") {
    const { req, res } = createMocks({ method });
    req.headers = {
      "Content-Type": "application/json",
    };

    return { req, res };
  }

  it("should return a successful response from Keyword Api", async () => {
    const { req, res } = mockRequestResponse("GET");
    req.query = {
      limit: 10,
      page: 1,
    };
    await hanlder(req, res);

    expect(res.statusCode).toBe(200);
    expect(res.getHeaders()).toEqual({ "content-type": "application/json" });
    expect(res.statusMessage).toEqual("OK");
  });

  it("should return a 405 if HTTP method is not GET", async () => {
    const { req, res } = mockRequestResponse("POST"); // Invalid HTTP call

    await hanlder(req, res);

    expect(res.statusCode).toBe(405);
  });
});
