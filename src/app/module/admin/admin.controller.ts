import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "admin data is retrive successfully",
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.getSingleAdminFromDB(req.params.id);

  console.log("result", result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "admin single data is retrive successfully",
    data: result,
  });
});

const updateSingleAdmin = catchAsync(async (req, res) => {
  console.log("controller update", req.params.id, req.body);
  const result = await AdminServices.updateSingleAdminIntoDB(
    req.params.id,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin single data is updated successfully",
    data: result,
  });
});

const deleteSingleAdmin = catchAsync(async (req, res) => {
  const result = await AdminServices.deleteSingleAdminFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin single data is updated successfully",
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmin,
  getSingleAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
};
