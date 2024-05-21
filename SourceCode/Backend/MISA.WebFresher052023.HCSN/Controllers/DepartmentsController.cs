using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.WebFresher052023.HCSN.Application.DTO.DepartmentDto;
using MISA.WebFresher052023.HCSN.Application.Interface;
using MISA.WebFresher052023.HCSN.Controllers.Base;

namespace MISA.WebFresher052023.HCSN.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class DepartmentsController : BaseController<DepartmentDto, DepartmentCreateDto, DepartmentUpdateDto>
    {
        public DepartmentsController(IDepartmentService departmentService) : base(departmentService) { }
    }
}
