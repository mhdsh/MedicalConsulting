using System;

namespace MedicalConsulting.API.Dtos
{
    public class UserToListDto
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsAdmin { get; set; }
        public string Gender { get; set; }
        public DateTime Created { get; set; }
        public int Age { get; set; }
        public DateTime LastActive { get; set; }
        public string Country { get; set; }
        public string photoUrl { get; set; }
    }
}