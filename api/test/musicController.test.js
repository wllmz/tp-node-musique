const MusicController = require('../controllers/musicController');
const Music = require('../models/musicModel');


jest.mock('../models/musicModel');

describe('MusicController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should list all music for a module', async () => {
    const moduleId = 'module123';

    const musics = [
      { title: 'Music 1', module_id: moduleId },
      { title: 'Music 2', module_id: moduleId },
    ];

    Music.find.mockResolvedValue(musics);

    const req = {
      params: {
        moduleId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await MusicController.listAllMusic(req, res);

    expect(Music.find).toHaveBeenCalledWith({ module_id: moduleId });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(musics);
  });

  test('Should handle error when listing all music', async () => {
    const moduleId = 'module123';

    Music.find.mockRejectedValue('Database error');

    const req = {
      params: {
        moduleId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await MusicController.listAllMusic(req, res);

    expect(Music.find).toHaveBeenCalledWith({ module_id: moduleId });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur serveur." });
  });

  test('Should create a new music', async () => {
    const userId = 'user123';
    const moduleId = 'module123';

    const req = {
      user: {
        id: userId,
      },
      params: {
        moduleId,
      },
      body: {
        title: 'New Music',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Music.findOne.mockResolvedValue(null);
    Music.prototype.save.mockResolvedValue({ title: 'New Music', module_id: moduleId, user_id: userId });

    await MusicController.createMusic(req, res);

    expect(Music.findOne).toHaveBeenCalledWith({ user_id: userId, module_id: moduleId });

    expect(Music.prototype.save).toHaveBeenCalledWith();

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ title: 'New Music', module_id: moduleId, user_id: userId });
  });

  test('Should handle error when creating a music', async () => {
    const userId = 'user123';
    const moduleId = 'module123';

    const req = {
      user: {
        id: userId,
      },
      params: {
        moduleId,
      },
      body: {
        title: 'New Music',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Music.findOne.mockRejectedValue('Database error');

    await MusicController.createMusic(req, res);

    expect(Music.findOne).toHaveBeenCalledWith({ user_id: userId, module_id: moduleId });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur serveur." });
  });

  test('Should handle existing music when creating a music', async () => {
    const userId = 'user123';
    const moduleId = 'module123';

    const req = {
      user: {
        id: userId,
      },
      params: {
        moduleId,
      },
      body: {
        title: 'New Music',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Music.findOne.mockResolvedValue({ title: 'Existing Music' });

    await MusicController.createMusic(req, res);

    expect(Music.findOne).toHaveBeenCalledWith({ user_id: userId, module_id: moduleId });

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Vous avez déjà créé une musique pour ce module." });
  });

  test('Should delete a music', async () => {
    const musicId = 'music123';

    const result = {
      deletedCount: 1,
    };

    const req = {
      params: {
        musicId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Music.deleteOne.mockResolvedValue(result);

    await MusicController.deleteMusic(req, res);

    expect(Music.deleteOne).toHaveBeenCalledWith({ _id: musicId });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Post supprimé avec succès" });
  });

  test('Should handle error when deleting a music', async () => {
    const musicId = 'music123';

    Music.deleteOne.mockRejectedValue('Database error');

    const req = {
      params: {
        musicId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await MusicController.deleteMusic(req, res);

    expect(Music.deleteOne).toHaveBeenCalledWith({ _id: musicId });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur serveur." });
  });

  test('Should handle non-existing music when deleting a music', async () => {
    const musicId = 'music123';

    const result = {
      deletedCount: 0,
    };

    const req = {
      params: {
        musicId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Music.deleteOne.mockResolvedValue(result);

    await MusicController.deleteMusic(req, res);

    expect(Music.deleteOne).toHaveBeenCalledWith({ _id: musicId });

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Post non trouvé" });
  });

  test('Should update a music', async () => {
    const musicId = 'music123';

    const req = {
      params: {
        musicId,
      },
      body: {
        title: 'Updated Music',
      },
    };

    const updatedMusic = { _id: musicId, title: 'Updated Music' };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Music.findByIdAndUpdate.mockResolvedValue(updatedMusic);

    await MusicController.updateMusic(req, res);

    expect(Music.findByIdAndUpdate).toHaveBeenCalledWith(musicId, req.body, { new: true });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedMusic);
  });

  test('Should handle error when updating a music', async () => {
    const musicId = 'music123';

    Music.findByIdAndUpdate.mockRejectedValue('Database error');

    const req = {
      params: {
        musicId,
      },
      body: {
        title: 'Updated Music',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await MusicController.updateMusic(req, res);

    expect(Music.findByIdAndUpdate).toHaveBeenCalledWith(musicId, req.body, { new: true });

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur serveur." });
  });

  test('Should handle non-existing music when updating a music', async () => {
    const musicId = 'music123';

    const req = {
      params: {
        musicId,
      },
      body: {
        title: 'Updated Music',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Music.findByIdAndUpdate.mockResolvedValue(null);

    await MusicController.updateMusic(req, res);

    expect(Music.findByIdAndUpdate).toHaveBeenCalledWith(musicId, req.body, { new: true });

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Post non trouvé" });
  });


  test('Should handle error when getting a music by ID', async () => {
    const musicId = 'music123';

    Music.findById.mockRejectedValue('Database error');

    const req = {
      params: {
        musicId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await MusicController.getMusicById(req, res);

    expect(Music.findById).toHaveBeenCalledWith(musicId);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Erreur serveur." });
  });

  test('Should handle non-existing music when getting a music by ID', async () => {
    const musicId = 'music123';

    const req = {
      params: {
        musicId,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Music.findById.mockResolvedValue(null);

    await MusicController.getMusicById(req, res);

    expect(Music.findById).toHaveBeenCalledWith(musicId);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Post non trouvé" });
  });
});
