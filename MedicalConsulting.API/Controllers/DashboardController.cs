using System;
using System.Collections;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using MedicalConsulting.API.Data;
using MedicalConsulting.API.Dtos;
using MedicalConsulting.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace MedicalConsulting.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConsultingRepository _consultingRepo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public DashboardController(IAuthRepository repo, IConsultingRepository consultingRepo, IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _consultingRepo = consultingRepo;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();

            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username already exists");

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            var userToReturn = _mapper.Map<UserForDetailDto>(createdUser);

            return CreatedAtRoute("GetUser", new {controller = "Users", id = createdUser.Id}, userToReturn);
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetPosts()
        {
            var posts = await _consultingRepo.GetPosts();

            var postsToReturn = _mapper.Map<IEnumerable<PostToListDto>>(posts);

            return Ok(posts);
        }

        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetPost")]
        public async Task<IActionResult> GetPost(int id)
        {
            var post = await _consultingRepo.GetPost(id);

            post.visits += 1;

            await _consultingRepo.SaveAll();

            var postToReturn = _mapper.Map<PostForDetailDto>(post);

            return Ok(postToReturn);
        }

        [HttpPut("add")]
        public async Task<IActionResult> AddPost(PostForAddDto postForAddDto)
        {
            var post = _mapper.Map<Post>(postForAddDto);

            // var userFromRepo = await _consultingRepo.GetUser(postForAddDto.UserId);

            // userFromRepo.Posts.Add(post);

            _consultingRepo.Add<Post>(post);

            if (await _consultingRepo.SaveAll())
              return NoContent();

            throw new Exception($"Adding post failed");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id) 
        {
            var post = await _consultingRepo.GetPost(id);
            
            _consultingRepo.Delete<Post>(post);

            if (await _consultingRepo.SaveAll())
              return NoContent();

            throw new Exception($"Deleting post failed");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, PostForUpdateDto postForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var postFromRepo = await _consultingRepo.GetPost(postForUpdateDto.Id);

            _mapper.Map(postForUpdateDto, postFromRepo);

            if (await _consultingRepo.SaveAll())
                return NoContent();

            throw new Exception($"Updating post {id} failed on save");
        }

    }
}