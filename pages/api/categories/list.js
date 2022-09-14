import Category from '../models/model_categories';

export default async function handler(req, res) {
  const categories = await Category.findAll();
  res.json(categories);
}
