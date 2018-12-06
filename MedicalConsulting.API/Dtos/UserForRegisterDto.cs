using System;
using System.ComponentModel.DataAnnotations;

namespace MedicalConsulting.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 3, ErrorMessage = "You must specify password between 4 and 8 characters")]
        public string Password { get; set; }

        [Required]
        public string Name { get; set; }

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Phone]
        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public bool IsAdmin { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public DateTime Created { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public DateTime LastActive { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string MedicalHistory { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
            IsAdmin = false;
        }
    }
}