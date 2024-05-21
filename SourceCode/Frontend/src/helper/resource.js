export default {
  VN: {
    noResult: 'Không tìm thấy kết quả phù hợp',
    deleteWarning: {
      deleteOne: 'Bạn có muốn xóa tài sản',
      deleteMany: 'tài sản đã được chọn. Bạn có muốn xóa các tài sản này không?',
      noDeleteOne: 'Không thể xóa tài sản này vì đã có chứng từ phát sinh.',
      noDeleteMany:
        'tài sản được chọn không thể xóa. Vui lòng kiểm tra lại tài sản trước khi thực hiện xóa.',
      deleteBlock: 'Bạn chưa chọn tài sản nào để xóa dữ liệu.'
    },
    exportWarning: {
      exportOne: 'Bạn có muốn xuất tài sản',
      exportMany:
        'tài sản đã được chọn. Bạn có muốn xuất các tài sản này ra file excel không?',
      exportBlock: 'Bạn chưa chọn tài sản nào để xuất dữ liệu.',
      exportAllLeft: 'Bạn có muốn xuất tất cả ',
      exportAllRight: ' tài sản ra file excel không?'
    },
    warningCancel: {
      noUpdate: 'Bạn có muốn hủy bỏ cập nhật bản ghi này?',
      noCreate: 'Bạn có muốn hủy bỏ khai báo bản ghi này?',
      edit: 'Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này?'
    },
    validate: {
      message: 'Cần phải nhập thông tin ',
      DepartmentCode: 'Mã bộ phận không tồn tại.',
      FixedAssetCategoryCode: 'Mã loại tài sản không tồn tại.',
      DepreciationRateLifeTime: 'Tỷ lệ hao mòn phải bằng 1/Số năm sử dụng.',
      YearDepreciationCost: 'Hao mòn năm phải nhỏ hơn hoặc bằng nguyên giá.',
      StartUsingDatePurchaseDate: 'Ngày bắt đầu sử dụng phải lớn hơn ngày mua.'
    },
    success: {
      update: 'Cập nhật dữ liệu thành công',
      create: 'Thêm dữ liệu thành công',
      replicate: 'Nhân bản dữ liệu thành công',
      delete: 'Xóa dữ liệu thành công'
    },
    error: {
      update: 'Cập nhật dữ liệu không thành công',
      create: 'Thêm dữ liệu không thành công',
      replicate: 'Nhân bản dữ liệu không thành công',
      loadData: 'Tải dữ liệu không thành công'
    },

    labelForm: {
      FixedAssetCode: 'Mã tài sản',
      FixedAssetName: 'Tên tài sản',
      DepartmentCode: 'Mã phòng ban sử dụng',
      DepartmentName: 'Tên phòng ban sử dụng',
      TransferDepartmentName: 'Tên phòng ban sử dụng mới',
      FixedAssetCategoryCode: 'Mã loại tài sản',
      FixedAssetCategoryName: 'Tên loại tài sản',
      Quantity: 'Số lượng',
      Cost: 'Nguyên giá',
      LifeTime: 'Số năm sử dụng',
      DepreciationRate: 'Tỷ lệ hao mòn (%)',
      YearDepreciation: 'Giá trị hao mòn năm',
      TrackedYear: 'Năm theo dõi',
      PurchaseDate: 'Ngày mua',
      StartUsingDate: 'Ngày bắt đầu sử dụng',
      DocumentCode: "Mã chứng từ",
      DocumentDate: "Ngày chứng từ",
      TransferDate: "Ngày điều chuyển",
      Note: "Ghi chú"
    },
    // Thông báo liên quan đến form
    Form: {
      // Cảnh báo
      Warning: {
        // Cảnh báo khi thoát form
        Cancel: {
          // Trường hợp thêm
          Add: "Bạn có muốn hủy bỏ khai báo tài sản này?",
          // Trường hợp cập nhật
          Update: "Bạn có muốn hủy cập nhật tài sản này?",
        },
        // Thông báo nếu người dùng thay đổi trong ô nhập liệu nào đó
        Edit: "Thông tin thay đổi sẽ không được cập nhật nếu bạn không lưu. Bạn có muốn lưu các thay đổi này",
        Transfer: {
          Edit: {
            ValueChange: "Dữ liệu đã thay đổi bạn có muốn lưu không?",
          },
          Add: {
            NoAsset: "Bạn chưa thêm tài sản điều chuyển",
            NoReceiver: "Bạn cần điền đầy đủ họ tên và đại diện của ban giao nhận",
          },
          Success: {
            Update: "Cập nhật chứng từ thành công",
            Add: "Thêm mới chứng từ thành công",
          },
          Save: {
            UnChange: "Bạn chưa thay đổi dữ liệu nên không thể lưu",
          },
          TransferAssetCode: "Mã chứng từ không được để trống",
          TransactionDate: "Ngày chứng từ không được để trống",
          SmallTransactionDate: "Ngày điều chuyển phải lớn hơn hoặc bằng ngày chứng từ",
          TransferDate: "Ngày điều chuyển không được để trống",
        },
        Department: {
          Duplicate:
            "Vui lòng chọn bộ phận điều chuyển đến khác bộ phận đang sử dụng",
        },
        // Trường hợp xóa
        Delete: {
          // Xóa 1 bản ghi
          Single: "Bạn có muốn xóa tài sản ",
          // Xóa nhiều bản ghi
          Multiple:
            " tài sản đã được chọn. Bạn có muốn xóa các tài sản này khỏi danh sách?",
          // Nếu không chọn bản ghi nào thì hiện thông báo
          Zero: "Hãy chọn ít nhất một tài sản để xóa!",
        },
        DeleteTransfer: {
          // Xóa 1 bản ghi
          Single: "Bạn có muốn xóa chứng từ ",
          // Xóa nhiều bản ghi
          Multiple:
            " chứng từ đã được chọn. Bạn có muốn xóa các chứng từ này khỏi danh sách?",
        },
        SelectData: {
          TransferAsset: "Bạn chưa chọn tài sản điều chuyển",
          Department: {
            Null: "Vui lòng chọn bộ phận sử dụng mới",
            Duplicate:
              "Vui lòng chọn bộ phận sử dụng mới khác bộ phận sử dụng hiện tại của tài sản",
          },
        },
        // Xuất excel
        Export: {
          // Xuất 1 bản ghi
          Single: "Bạn có muốn xuất excel tài sản ",
          // Xuất nhiều bản ghi
          Multiple:
            " tài sản đã được chọn. Bạn có muốn xuất excel các tài sản này không?",
        },
      },
      // Lưu thành công
      Success: "Lưu dữ liệu thành công",
      // Kiểm trả dữ liệu nhập
      Validate: {
        FixedAssetCode: "mã tài sản",
        FixedAssetName: "tên tài sản",
        DepartmentId: "mã bộ phận sử dụng",
        FixedAssetCategoryId: "mã loại tài sản",
        Quantity: "số lượng tài sản",
        Cost: "nguyên giá tài sản",
        LifeTime: "số năm sử dụng",
        AssetDepreciation: "tỉ lệ hao mòn",
        YearlyDepreciationAmount: "Giá trị hao mòn năm",
        CompareDate: "Ngày mua phải nhỏ hơn ngày bắt đầu sử dụng",
        PurchaseDate: "ngày mua",
        StartUsingDate: "ngày bắt đầu sử dụng",
      },
      // Giới hạn ký tự trong ô nhập liệu
      Max_value: {
        FixedAssetCode: "Mã tài sản không được vượt quá 50 ký tự",
        FixedAssetName: "Tên tài sản không được vượt quá 255 ký tự",
        Quantity: "Số lượng tài sản lớn hơn giới hạn cho phép",
        Cost: "Nguyên giá tài sản lớn hơn giới hạn cho phép",
      },
    },
    placeholderForm: {
      FixedAssetCode: 'Nhập mã tài sản',
      FixedAssetName: 'Nhập tên tài sản',
      DepartmentCode: 'Chọn mã bộ phận sử dụng',
      FixedAssetCategoryCode: 'Chọn mã loại tài sản',
      time: 'dd/mm/yyyy'
    },
    fileNameExcel: 'Danh_sach_tai_san.xlsx',
    formTitle: {
      create: 'Thêm tài sản',
      update: 'Cập nhật tài sản',
      replicate: 'Nhân bản tài sản', 
      createDepartment: 'Thêm phòng ban'
    },
    btnTitleForm: {
      create: 'Thêm',
      update: 'Lưu',
      replicate: 'Thêm',
      cancel: 'Hủy bỏ'
    },
    btnTitleToast: {
      cancel: 'Hủy bỏ',
      delete: 'Xóa',
      export: 'Xuất',
      dontSave: 'Không lưu'
    },
    btnDeleteActive: {
      delete: 'Xóa',
      cancel: 'Không',
      close: 'Đóng',
      agree: 'Đồng ý'
    },
    btnTitle: {
      create: 'Thêm tài sản'
    },
    tableHeaderTitle: {
      STT: 'STT',
      FixedAssetCode: 'Mã tài sản',
      FixedAssetName: 'Tên tài sản',
      DepartmentName: 'Tên bộ phận sử dụng',
      FixedAssetCategoryName: 'Tên loại tài sản',
      Quantity: 'Số lượng',
      Cost: 'Nguyên giá',
      cumulative: 'HM/KH lũy kế',
      remaining: 'Giá trị còn lại',
      option: 'Chức năng'
    },
    Asset: [
      {
        content: 'Ghi tăng'
      },
      {
        content: 'Thay đổi thông tin'
      },
      {
        content: 'Đánh giá lại'
      },
      {
        url: 'fixed_asset_transfer',
        content: 'Điều chuyển tài sản'
      },
      {
        content: 'Đề nghị xử lý'
      },
      {
        content: 'Ghi giảm'
      },
      {
        content: 'Tính hao mòn'
      },
      {
        content: 'Kiểm kê'
      },
      {
        content: 'Khác'
      },
    ]
  }
}
