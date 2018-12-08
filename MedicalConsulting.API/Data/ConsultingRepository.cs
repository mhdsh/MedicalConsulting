using System.Collections.Generic;
using System.Threading.Tasks;
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