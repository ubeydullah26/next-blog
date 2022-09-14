import Category from '../models/model_categories';
import { slug } from '../../../utils/helper';

export default function handler(req, res) {
  req.body.slug = slug(req.body.name);
  Category.create(req.body).then((category) => {
    res.json(category);
  });
}
