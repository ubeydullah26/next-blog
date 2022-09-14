import axios from 'axios';
import React, { useState } from 'react';

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

export default function List(props) {
  const [categories, setCategories] = useState(props.categories);

  return (
    <div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <a
                    href={`/admin/categories/edit/${item.id}`}
                    className="btn btn-primary me-2"
                  >
                    Edit
                  </a>

                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
