const UserController = require('../controllers/userController');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


jest.mock('../models/userModel');
jest.mock('jsonwebtoken');
jest.mock('bcrypt');

describe('UserController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should register a new user', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password',
        role: 'user',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    bcrypt.hash.mockResolvedValue('hashedPassword');
    User.prototype.save.mockResolvedValue();

    await UserController.register(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
    expect(User.prototype.save).toHaveBeenCalledWith();

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur enregistré avec succès" });
  });

  test('Should handle registration error', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password',
        role: 'user',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    bcrypt.hash.mockRejectedValue('Hashing error');

    await UserController.register(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur lors de l'enregistrement de l'utilisateur" });
  });

  test('Should log in a user with valid credentials', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const user = {
      _id: '123456',
      email: 'test@example.com',
      role: 'user',
      password: 'hashedPassword',
    };

    User.findOne.mockResolvedValue(user);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockResolvedValue('fakeToken');

    await UserController.userLogin(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: '123456', email: 'test@example.com', role: 'user' },
      process.env.JWT_KEY,
      { expiresIn: "30 days" }
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: 'fakeToken', id: '123456' });
  });


  test('Should handle login error', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.findOne.mockRejectedValue('Database error');

    await UserController.userLogin(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors du traitement" });
  });

  test('Should list all users', async () => {
    const users = [
      { email: 'user1@example.com', role: 'user' },
      { email: 'user2@example.com', role: 'admin' },
    ];

    User.find.mockResolvedValue(users);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.Alluser(req, res);

    expect(User.find).toHaveBeenCalledWith({});
    
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users);
  });

  test('Should handle error when listing all users', async () => {
    User.find.mockRejectedValue('Database error');

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.Alluser(req, res);

    expect(User.find).toHaveBeenCalledWith({});

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur serveur." });
  });
});
