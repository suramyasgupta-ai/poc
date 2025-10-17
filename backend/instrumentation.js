const { NodeSDK } = require('@opentelemetry/sdk-node');
const { SimpleLogRecordProcessor } = require("@opentelemetry/sdk-logs");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-proto");
const { OTLPMetricExporter } = require("@opentelemetry/exporter-metrics-otlp-proto");
const { OTLPLogExporter } = require("@opentelemetry/exporter-logs-otlp-proto");
// const { getNodeAutoInstrumentations } =require("@opentelemetry/auto-instrumentations-node");
const {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION
} = require('@opentelemetry/semantic-conventions');
const {
  getNodeAutoInstrumentations,
} = require('@opentelemetry/auto-instrumentations-node');
const {
  PeriodicExportingMetricReader, ConsoleMetricExporter
} = require('@opentelemetry/sdk-metrics');
const { resourceFromAttributes } = require('@opentelemetry/resources');
const { BunyanInstrumentation } = require('@opentelemetry/instrumentation-bunyan');
const sdk = new NodeSDK({ 
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: 'ride-share-app',
    [ATTR_SERVICE_VERSION]: '1.0.0',
  }), 
  traceExporter: new OTLPTraceExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: 'http://otel-collector:4318/v1/traces',
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  }),
  metricReader: new PeriodicExportingMetricReader({
    // exporter: new ConsoleMetricExporter()
    exporter: new OTLPMetricExporter({url: 'http://otel-collector:4318/v1/metrics', headers: {}, concurrencyLimit: 1}),
  }),
  logRecordProcessors: [new SimpleLogRecordProcessor(new OTLPLogExporter({
    // optional - default url is http://localhost:4318/v1/traces
    url: 'http://otel-collector:4318/v1/logs',
    // optional - collection of custom headers to be sent with each request, empty by default
    headers: {},
  }))], 
  instrumentations: [getNodeAutoInstrumentations(), new BunyanInstrumentation()],
});
sdk.start();
console.log("OTEL SDK called")





