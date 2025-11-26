// VIOLAÇÃO DO SRP - Classe com múltiplas responsabilidades
class UserManagerBad {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    validateEmail() {
        return this.email.includes('@');
    }

    saveToDatabase() {
        console.log(`Salvando ${this.name} no banco de dados...`);
    }

    sendWelcomeEmail() {
        console.log(`Enviando email de boas-vindas para ${this.email}`);
    }
}

// SEGUINDO O SRP - Cada classe tem uma única responsabilidade

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

class EmailValidator {
    validate(email) {
        return email.includes('@') && email.includes('.');
    }
}

class UserRepository {
    save(user) {
        console.log(`Salvando ${user.name} no banco de dados...`);
        return true;
    }
}

class EmailService {
    sendWelcomeEmail(user) {
        console.log(`Enviando email de boas-vindas para ${user.email}`);
        return true;
    }
}

class UserService {
    constructor() {
        this.validator = new EmailValidator();
        this.repository = new UserRepository();
        this.emailService = new EmailService();
    }

    registerUser(name, email) {
        const user = new User(name, email);

        if (!this.validator.validate(user.email)) {
            console.log('Email inválido!');
            return false;
        }

        this.repository.save(user);
        this.emailService.sendWelcomeEmail(user);
        console.log('Usuário registrado com sucesso!\n');
        return true;
    }
}

console.log("=== Single Responsibility Principle ===\n");

const userService = new UserService();
userService.registerUser("Gabriel", "gabriel@example.com");
userService.registerUser("João", "joao-email-invalido");