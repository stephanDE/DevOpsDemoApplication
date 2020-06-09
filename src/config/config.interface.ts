export interface Config {
  port: number;
  prefix?: string;
  mongo?: MongoConfig;
  kafka?: KafkaConfig;
}

export interface MongoConfig {
  uri?: string;
  database?: string;
}

export interface KafkaConfig {
  clientId?: string;
  brokerUris?: string[];
}
