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

        public Task<Message> GetMessage(int id)
        {
            return _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<PagedList<Message>> GetMessagesForUser(MessageParams messageParams)
        {
            var messages = _context.Messages
               .Include(u => u.Sender)
               .Include(u => u.Recipient)
               .AsQueryable();

            messages = messages.Where(m => m.Sender.IsAdmin == false);
            messages = messages.OrderBy(d => d.IsRead).ThenBy(d => d.MessageSent);
            return await PagedList<Message>.CreateAsync(messages,
                messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId)
        {
            var messages = await _context.Messages
               .Include(u => u.Sender)
               .Include(u => u.Recipient)
               .Where(m => m.RecipientId == userId
                   && m.RecipientDeleted == false
                   && (m.Sender.IsAdmin == true)
                   || m.SenderDeleted == false
                   && m.SenderId == userId)
               .OrderBy(m => m.MessageSent)
               .ToListAsync();

            return messages;
        }

        public async Task<IEnumerable<Message>> GetMessageThreadForAdmin(int userId)
        {
            var messages = await _context.Messages
               .Include(u => u.Sender)
               .Include(u => u.Recipient)
               .Where(m => m.RecipientId == userId
                   && m.RecipientDeleted == false
                   || m.SenderDeleted == false
                   && m.SenderId == userId)
               .OrderBy(m => m.MessageSent)
               .ToListAsync();

            return messages;
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