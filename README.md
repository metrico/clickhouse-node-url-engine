<img src="https://user-images.githubusercontent.com/1423657/147935343-598c7dfd-1412-4bad-9ac6-636994810443.png" width=220 >

# ClickHouse NodeJS URL Engine
This basic example illustrates a simple NodeJS URL Engine server for Clickhouse

#### Setup
Install and run the example server

#### Clickhouse
Create a URL Engine table pointed at our service:
```
CREATE TABLE url_engine_node
(
    `key` String,
    `value` UInt64
)
ENGINE = URL('http://127.0.0.1:3123/', JSONEachRow)
```
 
 ##### INSERT
 ```
 INSERT INTO url_engine_node VALUES ('hello',1), ('world', 2)
 ```
 ##### SELECT
 ```
SELECT *
FROM url_engine_node

Query id: d65b429e-76aa-49f3-b376-ebd3fbc9cd1a

┌─key───┬─value─┐
│ hello │     1 │
│ world │     2 │
└───────┴───────┘

2 rows in set. Elapsed: 0.005 sec. 
 ```
 
