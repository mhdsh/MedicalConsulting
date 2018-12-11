using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MedicalConsulting.API.Data;
using MedicalConsulting.API.Dtos;
using MedicalConsulting.API.Helpers;
using MedicalConsulting.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace MedicalConsulting.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    public class PhotosController : ControllerBase
    {
        private readonly IConsultingRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosController(IConsultingRepository repo, IMapper mapper,
        IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photo = _mapper.Map<PhotoForReturnDto>(photoFromRepo);
            
            return Ok(photo);
        }


        [HttpPost("{id}")]
        public async Task<IActionResult> AddPhotoForUser(int id, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0) 
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            // photoForCreationDto.Url = uploadResult.Uri.ToString();
            // photoForCreationDto.PublicId = uploadResult.PublicId;

            // var photo = _mapper.Map<Photo>(photoForCreationDto);

            userFromRepo.photoUrl = uploadResult.Uri.ToString();
            userFromRepo.PublicIdPhoto = uploadResult.PublicId;

            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("Could not add the photo");


        }

        
        [HttpPost]
        public IActionResult AddPhotoForPost([FromForm]PhotoForCreationDto photoForCreationDto)
        {
            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0) 
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);
            
            return Ok(photo);


        }
}
}