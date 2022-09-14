import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export async function getServerSideProps(context) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_URL}/api/categories/list`
  );
  return {
    props: {
      categories: res.data,
    },
  };
}

export default function Create(props) {
  const [categories, setCategories] = useState(props.categories);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  const onSubmit = (data) => {
    axios
      .post('/api/categories/create', data)
      .then((res) => {
        console.log(res.data);
        getCategories();
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="container col-6">
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
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
