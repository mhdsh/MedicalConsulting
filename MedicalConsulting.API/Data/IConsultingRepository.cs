using System.Collections.Generic;
using System.Threading.Tasks;
using MedicalConsulting.API.Helpers;
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
         Task<PagedList<Post>> GetPostsForPagination(PostParams userParams);
         Task<Post> GetPost(int id);
         Task<Photo> GetPhoto(int id);
         Task<Message> GetMessage(int id);
         Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams);
         Task<IEnumerable<Message>> GetMessageThread(int userId);
         Task<IEnumerable<Message>> GetMessageThreadForAdmin(int userId);
    }
}