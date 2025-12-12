import { Emprunt, Exemplaire, Book, User, Amende } from '../models/associations.js';

class EmpruntService {
  async create(empruntData) {
    try {
      const emprunt = await Emprunt.create(empruntData);

      // Set the exemplaire to not disponible
      if (empruntData.copyId) {
        const { Exemplaire } = await import('../models/associations.js');
        await Exemplaire.update(
          { disponible: false },
          { where: { id: empruntData.copyId } }
        );
      }

      return emprunt;
    } catch (error) {
      throw new Error(`Error creating emprunt: ${error.message}`);
    }
  }

  async findAll() {
    try {
      const emprunts = await Emprunt.findAll({
        include: [
          {
            model: Exemplaire,
            as: 'copy',
            include: [{
              model: Book,
              as: 'book'
            }]
          },
          {
            model: User,
            as: 'user'
          },
          {
            model: Amende,
            as: 'amendes'
          }
        ]
      });
      return emprunts;
    } catch (error) {
      throw new Error(`Error fetching emprunts: ${error.message}`);
    }
  }

  async findByUserId(userId) {
    try {
      const emprunts = await Emprunt.findAll({
        where: { userId },
        include: [
          {
            model: Exemplaire,
            as: 'copy',
            include: [{
              model: Book,
              as: 'book'
            }]
          },
          {
            model: User,
            as: 'user'
          },
          {
            model: Amende,
            as: 'amendes'
          }
        ]
      });
      return emprunts;
    } catch (error) {
      throw new Error(`Error fetching emprunts by user: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const emprunt = await Emprunt.findByPk(id, {
        include: [
          {
            model: Exemplaire,
            as: 'copy',
            include: [{
              model: Book,
              as: 'book'
            }]
          },
          {
            model: User,
            as: 'user'
          },
          {
            model: Amende,
            as: 'amendes'
          }
        ]
      });
      return emprunt;
    } catch (error) {
      throw new Error(`Error fetching emprunt: ${error.message}`);
    }
  }

  async update(id, empruntData) {
    try {
      // If returnDate is being set, also update the exemplaire to disponible = true
      if (empruntData.returnDate) {
        const emprunt = await Emprunt.findByPk(id, { include: ['copy'] });
        if (emprunt && emprunt.copy) {
          await emprunt.copy.update({ disponible: true });
        }
      }

      const [updated] = await Emprunt.update(empruntData, { where: { id } });
      if (updated) {
        const updatedEmprunt = await Emprunt.findByPk(id, {
          include: [
            {
              model: Exemplaire,
              as: 'copy',
              include: [{
                model: Book,
                as: 'book'
              }]
            },
            {
              model: User,
              as: 'user'
            },
            {
              model: Amende,
              as: 'amendes'
            }
          ]
        });
        return updatedEmprunt;
      }
      throw new Error('Emprunt not found');
    } catch (error) {
      throw new Error(`Error updating emprunt: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const deleted = await Emprunt.destroy({ where: { id } });
      if (deleted) {
        return { message: 'Emprunt deleted successfully' };
      }
      throw new Error('Emprunt not found');
    } catch (error) {
      throw new Error(`Error deleting emprunt: ${error.message}`);
    }
  }
}

export default new EmpruntService();
