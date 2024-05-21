using AutoMapper;
using MISA.WebFresher052023.HCSN.Application.DTO.DepartmentDto;
using MISA.WebFresher052023.HCSN.Application.Interface;
using MISA.WebFresher052023.HCSN.Domain;
using MISA.WebFresher052023.HCSN.Domain.Entity;
using MISA.WebFresher052023.HCSN.Domain.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.WebFresher052023.HCSN.Application.Service
{
    public class DepartmentService : BaseService<Department, DepartmentDto, DepartmentCreateDto, DepartmentUpdateDto>, IDepartmentService
    {
        #region Fields
        private readonly IDepartmentRepository _departmentRepository;
        private readonly IFixedAssetManager _fixedAssetManager;
        #endregion

        #region Constructors
        public DepartmentService(IDepartmentRepository departmentRepository, IMapper mapper, IUnitOfWork unitOfWork, IFixedAssetManager fixedAssetManager) : base(departmentRepository, mapper, unitOfWork)
        {
            _departmentRepository = departmentRepository;
            _fixedAssetManager = fixedAssetManager;
        } 
        #endregion

        public override async Task<Department> MapCreateDtoToEntity(DepartmentCreateDto entityCreateDto)
        {
            await _fixedAssetManager.CheckExistedDepartEntityByCode(entityCreateDto.DepartmentCode);
            // Khởi tạo một đối tượng Asset mới để đưa dữ liệu từ AssetCreateDto vào.
            var asset = _mapper.Map<Department>(entityCreateDto);

            // Trả về đối tượng Asset đã được khởi tạo và sẵn sàng để lưu vào cơ sở dữ liệu.
            return asset;
        }

        public override async Task<Department> MapUpdateDtoToEntity(Guid id, DepartmentUpdateDto entityUpdateDto)
        {
            // Lấy thông tin tài sản hiện tại từ cơ sở dữ liệu dựa trên ID được cung cấp.
            var oldAsset = await _baseRepository.GetAsync(id);

            // Thực hiện kiểm tra nghiệp vụ trước khi cập nhật đối tượng Asset.
            await _fixedAssetManager.CheckExistedDepartEntityByCode(entityUpdateDto.DepartmentCode, oldAsset.DepartmentCode);

            // Khởi tạo một đối tượng Asset mới để đưa dữ liệu từ AssetUpdateDto vào.
            var asset = _mapper.Map<Department>(entityUpdateDto);

            // Trả về đối tượng Asset đã được khởi tạo và sẵn sàng để cập nhật thông tin vào cơ sở dữ liệu.
            return asset;
        }
    }
}
