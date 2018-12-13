using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedicalConsulting.API.Helpers;
using MedicalConsulting.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MedicalConsulting.API.Data
{
    public class ConsultingRepository : IConsultingRepository
    {
        private readonly DataContext _context;

        public ConsultingRepository(DataContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public async Task<Post> GetPost(int id)
        {
            var post = await _context.Posts.Include(p => p.PostPhotos).FirstOrDefaultAsync(p => p.Id == id);

            return post;
        }

        public async Task<IEnumerable<Post>> GetPosts()
        {
            var posts = await _context.Posts.ToListAsync();

            return posts;
        }

        public async Task<PagedList<Post>> GetPostsForPagination(PostParams userParams)
        {
            var posts = _context.Posts.OrderByDescending(p => p.visits);

            return await PagedList<Post>.CreateAsync(posts, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}