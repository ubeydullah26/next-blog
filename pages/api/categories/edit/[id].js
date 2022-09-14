import Category from '../../models/model_categories';
import { slug } from '../../../../utils/helper';

export default async function handler(req, res) {
  req.body.slug = slug(req.body.name);
  const update = await Category.update(req.body, {
    where: {
      id: req.query.id,
    },
  });
  res.json(update);
}
