const ModuleController = require('../controllers/moduleController');
const Module = require('../models/moduleModel');

jest.mock('../models/moduleModel');

describe('ModuleController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should list all modules', async () => {

    Module.find.mockResolvedValue([
      { title: 'Module 1', expiration_date: new Date() },
      { title: 'Module 2', expiration_date: new Date() },
    ]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ModuleController.listAllModules(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { title: 'Module 1', expiration_date: expect.any(Date) },
      { title: 'Module 2', expiration_date: expect.any(Date) },
    ]);
  });

  test('Should list all future modules', async () => {
    const currentDateTime = new Date();


    Module.find.mockResolvedValue([
      { title: 'Future Module 1', expiration_date: new Date(currentDateTime.getTime() + 10000) },
      { title: 'Future Module 2', expiration_date: new Date(currentDateTime.getTime() + 20000) },
    ]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ModuleController.listAllModulesFuturs(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { title: 'Future Module 1', expiration_date: expect.any(Date) },
      { title: 'Future Module 2', expiration_date: expect.any(Date) },
    ]);
  });

  test('Should create a module', async () => {
    const moduleData = {
      title: 'New Module',
      expiration_date: new Date(new Date().getTime() + 10000),
    };

    
    Module.prototype.save.mockResolvedValue(moduleData);

    const req = {
      body: moduleData,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ModuleController.createModule(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(moduleData);
  });

  test('Should not create a module with an expired date', async () => {
    const moduleData = {
      title: 'Expired Module',
      expiration_date: new Date(new Date().getTime() - 10000), 
    };

    const req = {
      body: moduleData,
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await ModuleController.createModule(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({ message: "La date d'expiration doit être dans le futur." });
  });

  test('Should delete a module', async () => {
    const moduleId = '123456'; 
    const result = { deletedCount: 1 };

    Module.deleteOne.mockResolvedValue(result);

    const req = {
      params: {
        moduleId: moduleId, 
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ModuleController.deleteModule(req, res);

    expect(Module.deleteOne).toHaveBeenCalledWith({ _id: moduleId });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Post supprimé avec succès" });
  });

  test('Should return 404 when trying to delete a non-existing module', async () => {
    const moduleId = 'non-existing-id';

    Module.deleteOne.mockResolvedValue({ deletedCount: 0 });

    const req = {
      params: {
        moduleId: moduleId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ModuleController.deleteModule(req, res);

    expect(Module.deleteOne).toHaveBeenCalledWith({ _id: moduleId });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Post non trouvé" });
  });


  test('Should return 404 when trying to update a non-existing module', async () => {
    const moduleId = 'non-existing-id'; 

    Module.findByIdAndUpdate.mockResolvedValue(null);

    const req = {
      params: {
        moduleId: moduleId,
      },
      body: { title: 'Updated Module' },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ModuleController.updateModule(req, res);

    expect(Module.findByIdAndUpdate).toHaveBeenCalledWith(moduleId, req.body, { new: true });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Post non trouvé" });
  });

  test('Should get a module by ID', async () => {
    const moduleId = '123456'; 
    const moduleData = {
      title: 'Module',
      expiration_date: new Date(),
    };

    Module.findById.mockResolvedValue(moduleData);

    const req = {
      params: {
        moduleId: moduleId, 
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ModuleController.getModuleById(req, res);

    expect(Module.findById).toHaveBeenCalledWith(moduleId);
    expect(res.json).toHaveBeenCalledWith(moduleData);
  });

  test('Should return 404 when trying to get a non-existing module by ID', async () => {
    const moduleId = 'non-existing-id'; 


    Module.findById.mockResolvedValue(null);

    const req = {
      params: {
        moduleId: moduleId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await ModuleController.getModuleById(req, res);

    expect(Module.findById).toHaveBeenCalledWith(moduleId);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Post non trouvé" });
  });
});
