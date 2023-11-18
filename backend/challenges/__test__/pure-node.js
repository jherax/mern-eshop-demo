/* eslint-disable no-console */

/**
 * This segment is to test dynamic imports.
 * Using `require()` to load an ES module is not supported because ES modules
 * have asynchronous execution. Instead, use `await import()` to load an
 * ES module from a CommonJS module.
 *
 * const moduleProps = import('./module.mjs');
 */

const http = require('http');
// mysql = require('mysql')

/**
 * Database connection mock
 */
const mysql = {
  createConnection: config => {
    return {
      query: sqlQuery =>
        Promise.resolve([
          {userid: 23, maxAmount: 5},
          {userid: 5, maxAmount: 9},
          {userid: 74, maxAmount: 2},
          {userid: 32, maxAmount: 15},
          {userid: 978, maxAmount: 53},
          {userid: 43, maxAmount: 7},
        ]),
      end: () => {
        /* empty */
      },
    };
  },
  escape: value => value,
};

const connection = mysql.createConnection({});

const getTransactionsByUsers = async userIds => {
  const uniqueUserIds = new Set(userIds);
  const sqlParams = Array.from(uniqueUserIds).join(',');
  const sqlQuery = `
    SELECT userid, MAX(amount) AS maxAmount
    FROM transactions
    WHERE userid IN (${mysql.escape(sqlParams)})
    GROUP BY userid;`;

  const transactions = await connection.query(sqlQuery);
  connection.end();
  return transactions;
};

const requestListener = (request, response) => {
  request.setEncoding('utf8');
  let serverResponse = {};
  const headers = {
    'Content-Type': 'application/json',
  };

  if (request.method === 'POST') {
    if (request.url === '/getMaxTransactionAmountForUsers') {
      request.on('data', async bodyJson => {
        const {userIds, role} = JSON.parse(bodyJson);
        if (role === 'ADMIN') {
          const maxTransactionAmountForUsers = await getTransactionsByUsers(
            userIds,
          );
          serverResponse = {
            statusCode: 200,
            success: true,
            data: {maxTransactionAmountForUsers},
          };
        } else {
          serverResponse = {
            statusCode: 403,
            success: false,
            data: [],
            error: {
              message: 'You are not authorized to complete this action',
            },
          };
        }

        response.writeHead(serverResponse.statusCode, headers);
        response.write(JSON.stringify(serverResponse));
        response.end();
      });
    }
  } else {
    /**
     * Not a POST method.
     */
    serverResponse = {
      statusCode: 404,
      success: false,
      data: [],
      error: {
        message: 'Requested API not found',
      },
    };
    response.writeHead(serverResponse.statusCode, headers);
    response.write(JSON.stringify(serverResponse));
    response.end();
  }
};

/**
 * @see https://dev.to/halilcanozcelik/building-a-web-server-with-pure-node-js-4g6i
 */
const server = http.createServer(requestListener);
server.listen(9000, () => {
  const {address, port} = server.address();
  console.log(`Running Node in ${address}:${port}`);
});

/**
 * Using dynamic imports.
 * (async () => console.log((await moduleProps).default))();
 */
