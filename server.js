/** CLICKHOUSE URL Engine handler */
/**
  CREATE TABLE url_engine_node
  (
    `key` String,
    `value` UInt64
  )
  ENGINE = URL('http://127.0.0.1:3123/', JSONEachRow)
*/

const fastify = require('fastify')({ logger: true })
var memory = [];

/** CLICKHOUSE URL SELECT */
fastify.get('/', async (request, reply) => {
  return memory;
})

/** CLICKHOUSE URL INSERT */
fastify.post('/', async (request, reply) => {
  request.body.forEach(row => memory.push({key: row.key, value: parseInt(row.value)}));
  return {}
})

/**
 * @param req {FastifyRequest}
 * @returns {Promise<string>}
 */
async function getContentBody (req) {
  let body = ''
  req.raw.on('data', data => {
    body += data.toString();
  })
  await new Promise(resolve => req.raw.once('end', resolve))
  return body;
}

/**
 * @param req {FastifyRequest}
 * @returns {Promise<void>}
 */
async function genericJSONParser (req) {
  try {
    var body = await getContentBody(req)
    const response = body
    .trim()
    .split('\n')
    .map(JSON.parse)
    .map(obj => Object.entries(obj).sort().reduce(
      (o, [k, v]) => (o[k] = v, o), {})
    );
    return response;
  } catch (err) {
    err.statusCode = 400
    throw err
  }
}

fastify.addContentTypeParser('*', {},
  async function (req, body, done) {
    return await genericJSONParser(req)
})


/** RUN URL Engine */
const start = async () => {
  try {
    await fastify.listen(3123)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
