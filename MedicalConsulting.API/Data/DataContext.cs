using MedicalConsulting.API.Models;
using Microsoft.EntityFrameworkCore;

namespace MedicalConsulting.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}

        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<PostPhoto> PostPhotos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PostPhoto>().HasKey(pp => new { pp.PostId, pp.PhotoId });
    }
    }
}