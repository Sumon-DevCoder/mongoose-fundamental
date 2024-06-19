import QueryBuilder from "../../builder/QueryBuilder";
import { adminSearchableFields } from "./admin.constant";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateSingleAdminIntoDB = async (
  id: string,
  payload: Partial<TAdmin>
) => {
  const result = await Admin.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateSingleAdminIntoDB,
};
