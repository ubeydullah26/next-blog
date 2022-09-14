import Category from '../../models/model_categories';

export default async function handler(req, res) {
  const category = await Category.findOne({
    where: {
      id: req.query.id,
    },
  });
  res.json(category);
}
