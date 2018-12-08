using System;
using System.Collections.Generic;

namespace MedicalConsulting.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public bool IsAdmin { get; set; }
        public string Gender { get; set; }
        public DateTime Created { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime LastActive { get; set; }
        public string Country { get; set; }
        public string MedicalHistory { get; set; }
        public string photoUrl { get; set; }
        public ICollection<Post> Posts { get; set; }
    }
}