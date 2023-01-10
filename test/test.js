const { findServer } = require('../serverScript');

const axios = require('axios')

beforeEach(() => {
  jest.clearAllMocks()
})

jest.mock("axios");

axios.mockResolvedValue({ status: 200 });

it("check server", async () => {
  const server = await findServer();
  expect(server.status).toBeGreaterThanOrEqual(200);
  expect(server.status).toBeLessThanOrEqual(299);
})

it("check offline server", async () => {
  axios.mockResolvedValue({ status: 500 });
  const server = await findServer();
  expect(server.status).toBeGreaterThanOrEqual(200);
  expect(server.status).toBeLessThanOrEqual(299);
})