import { categories } from "../../constants/data"; // ✅ Correct import
import { Link, useSearchParams } from "react-router-dom";

const Categories = () => {
  const [searchParams] = useSearchParams(); // ✅ Correct usage
  const category = searchParams.get("category"); // ✅ Fix incorrect syntax

  return (
    <div className="p-4">
      {/* Create Blog Button */}
      <Link to={`/create?category=${category || ''}`}>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
          Create Blog
        </button>
      </Link>

      {/* Categories List */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* All Categories Link */}
        <div className="bg-gray-200 p-3 font-semibold">
          <Link to="/">All Categories</Link>
        </div>

        <ul className="divide-y divide-gray-300">
          {categories.map((categoryItem, index) => (
            <li key={index} className="p-3 hover:bg-gray-100 cursor-pointer">
              <Link to={`/?category=${categoryItem.type}`}>{categoryItem.type}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
