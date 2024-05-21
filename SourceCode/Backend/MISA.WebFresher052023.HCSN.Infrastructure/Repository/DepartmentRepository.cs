using MISA.WebFresher052023.HCSN.Domain.Interface;
using MISA.WebFresher052023.HCSN.Domain;
using MISA.WebFresher052023.HCSN.Infrastructure.Repository.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MISA.WebFresher052023.HCSN.Domain.Entity;
using Dapper;

namespace MISA.WebFresher052023.HCSN.Infrastructure.Repository
{
    public class DepartmentRepository : BaseRepository<Department>, IDepartmentRepository
    {
        #region Constructors
        public DepartmentRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
        #endregion

        public async Task<Department?> FindDepartByCodeAsync(string code)
        {
            var query = $"SELECT * FROM Department a WHERE a.DepartmentCode = @code";
            var parameters = new DynamicParameters();
            parameters.Add("code", code);

            var result = await _uow.Connection.QueryFirstOrDefaultAsync<Department>(query, parameters, transaction: _uow.Transaction);
            return result;
        }
    }
}
