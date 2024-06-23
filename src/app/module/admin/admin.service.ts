import QueryBuilder from "../../builder/QueryBuilder";
import { adminSearchableFields } from "./admin.constant";
import { TAdmin } from "./admin.interface";
import { Admin } from "./admin.model";

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find().populate("user"), query)
    .search(adminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminFromDB = async (
  id: string
  // query: Record<string, unknown>
) => {
  const result = await Admin.findById(id).populate("user");
  return result;
};

const updateSingleAdminIntoDB = async (
  id: string,
  payload: Partial<TAdmin>
) => {
  console.log("update service", id, payload);

  // desctucring non-primitive data from payload
  // const { name, ...remainingAdminData } = payload;
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  console.log("modifiedUpdatedData", modifiedUpdatedData);

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }

    console.log("modifiedUpdatedData", modifiedUpdatedData);

    const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
      new: true,
      runValidators: true,
    });

    console.log("update service result", result);

    return result;
  }
};

export const AdminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  updateSingleAdminIntoDB,
};
