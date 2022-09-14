import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export async function getServerSideProps(context) {
  const categories = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/categories/list`
  );
  const category = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/categories/get/${context.params.id}`
  );
  return {
    props: {
      categories: categories.data,
      category: category.data,
    },
  };
}

export default function Edit(props) {
  const [categories, setCategories] = useState(props.categories);
  const [category, setCategory] = useState(props.category);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: category.name,
      parent_id: category.parent_id,
    },
  });

  const getCategories = async () => {
    await axios
      .get('/api/categories/list')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategory = async () => {
    await axios
      .get(`/api/categories/get/${category.id}`)
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    axios
      .post(`/api/categories/edit/${props.category.id}`, data)
      .then((res) => {
        getCategory();
        getCategories();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container col-6 mt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="form-control mb-3"
            {...register('name')}
            placeholder="Category name"
          />
          <select
            className="form-select mb-3"
            {...register('parent_id')}
          >
            <option value="0">Main Category</option>
            {categories.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
