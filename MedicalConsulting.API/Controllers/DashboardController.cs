using System.Threading.Tasks;
using MedicalConsulting.API.Data;
using MedicalConsulting.API.Dtos;
using MedicalConsulting.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace MedicalConsulting.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;

        public DashboardController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterAdminDto userForRegisterAdmin)
        {
            userForRegisterAdmin.Username = userForRegisterAdmin.Username.ToLower();

            if (await _repo.UserExists(userForRegisterAdmin.Username))
                return BadRequest("Username already exists");

            var userToCreate = new User
            {
                Username = userForRegisterAdmin.Username,
                IsAdmin = userForRegisterAdmin.IsAdmin
            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterAdmin.Password);

            return StatusCode(201);
        }
    }
}