using System.Collections.Generic;
using System.Threading.Tasks;
using MedicalConsulting.API.Models;

namespace MedicalConsulting.API.Data
{
    public interface IConsultingRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<User>> GetUsers();
         Task<User> GetUser(int id);
         Task<IEnumerable<Post>> GetPosts();
         Task<Post> GetPost(int id);
         Task<Photo> GetPhoto(int id);
    }
}