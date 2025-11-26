// VIOLAÇÃO DO DIP - Dependência de implementações concretas
class MySQLDatabase {
    connect() {
        console.log("Conectando ao MySQL...");
    }
    
    save(data) {
        console.log(`MySQL: Salvando ${data}`);
    }
}

class UserServiceBad {
    constructor() {
        // Dependência direta de implementação concreta
        this.database = new MySQLDatabase();
    }
    
    saveUser(name) {
        this.database.connect();
        this.database.save(name);
    }
}

// SEGUINDO O DIP - Dependência de abstrações

// Abstração (interface simulada com classe base)
class Database {
    connect() {
        throw new Error("Método connect deve ser implementado");
    }
    
    save(data) {
        throw new Error("Método save deve ser implementado");
    }
}

// Implementações concretas
class MySQLDatabaseImpl extends Database {
    connect() {
        console.log("Conectando ao MySQL...");
    }
    
    save(data) {
        console.log(`MySQL: Salvando ${data}`);
    }
}

class MongoDatabase extends Database {
    connect() {
        console.log("Conectando ao MongoDB...");
    }
    
    save(data) {
        console.log(`MongoDB: Salvando ${data}`);
    }
}

class PostgreSQLDatabase extends Database {
    connect() {
        console.log("Conectando ao PostgreSQL...");
    }
    
    save(data) {
        console.log(`PostgreSQL: Salvando ${data}`);
    }
}

// Módulo de alto nível depende da abstração
class UserService {
    constructor(database) {
        // Injeção de dependência - recebe a abstração
        this.database = database;
    }
    
    saveUser(name) {
        this.database.connect();
        this.database.save(name);
    }
}

// Demonstração
console.log("=== Dependency Inversion Principle ===\n");

console.log("--- Usando MySQL ---");
const mysqlDb = new MySQLDatabaseImpl();
const userService1 = new UserService(mysqlDb);
userService1.saveUser("Gabriel");

console.log("\n--- Usando MongoDB ---");
const mongoDb = new MongoDatabase();
const userService2 = new UserService(mongoDb);
userService2.saveUser("João");

console.log("\n--- Usando PostgreSQL ---");
const postgresDb = new PostgreSQLDatabase();
const userService3 = new UserService(postgresDb);
userService3.saveUser("Maria");