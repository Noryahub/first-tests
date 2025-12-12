import empruntService from '../Services/EmpruntService.js';

class EmpruntController {
  async getEmprunts(req, res) {
    try {
      const { userId } = req.query;
      let emprunts;

      if (userId) {
        emprunts = await empruntService.findByUserId(userId);
      } else {
        emprunts = await empruntService.findAll();
      }

      res.json(emprunts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEmpruntById(req, res) {
    try {
      const { id } = req.params;
      const emprunt = await empruntService.findById(id);
      if (emprunt) {
        res.json(emprunt);
      } else {
        res.status(404).json({ error: 'Emprunt not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createEmprunt(req, res) {
    try {
      const empruntData = req.body;
      const emprunt = await empruntService.create(empruntData);
      res.status(201).json(emprunt);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateEmprunt(req, res) {
    try {
      const { id } = req.params;
      const empruntData = req.body;
      const emprunt = await empruntService.update(id, empruntData);
      res.json(emprunt);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteEmprunt(req, res) {
    try {
      const { id } = req.params;
      const result = await empruntService.delete(id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new EmpruntController();
