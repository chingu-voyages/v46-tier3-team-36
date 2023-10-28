import propertiesService from './properties-service';
import express from 'express';

const router = express.Router();

router
	/**
	 * Create a new property
	 */
  .post('/api/admin/properties', async (req, res) => {
    const user = req.user;
    const newProperty = await propertiesService.createProperty(user, req.body);

    return res.status(201).json(newProperty);
  })

  /**
	 * Get a single property by the given id
	 */
  .get('/api/admin/properties/:id', async (req, res) => {
    const user = req.user;
    const property = await propertiesService.getProperty(Number(req.params.id))
    
    return res.status(200).json(property)
  })

  /**
	 * Get all properties for the logged in admin
	 */
  .get('/api/admin/properties', async (req, res) => {
    const user = req.user;
    const properties = await propertiesService.getAllProperties(user)
    
    return res.status(200).json(properties)
  })

  /**
	 * Update a property
	 */
  .patch('/api/admin/properties/:id', async (req, res) => {
    const user = req.user;
    const property = await propertiesService.updateProperty(Number(req.params.id), req.body)

    res.status(200).json(property);
  })

  /**
	 * Delete a property
	 */
  .delete('/api/admin/properties/:id', async (req, res) => {
    const user = req.user;
    const property = await propertiesService.deleteProperty(Number(req.params.id))

    res.status(200).json(property);
  })

export default router;