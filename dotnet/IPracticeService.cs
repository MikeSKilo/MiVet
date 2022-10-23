using Sabio.Models;
using Sabio.Models.Domain.Practices;
using Sabio.Models.Requests.Practices;

namespace Sabio.Services.Interfaces
{
    public interface IPracticeService
    {
        int AddPractice(PracticeAddRequest model, int userId);
        Practice GetPracticeById (int id);
        void UpdatePractice(PracticeUpdateRequest model, int userId);
        Paged<Practice> GetPractices(int PageIndex, int PageSize);
        Paged<Practice> GetPracticesByCreatedByPage(int PageIndex, int PageSize, int userId);

        Paged<Practice> GetPracticeBySearch(int PageIndex, int PageSize, string Query);
        void Delete(int id);


    }
}