using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MedicalConsulting.API.Controllers
{
    [Authorize]
    [Route("api/")]
    public class PhotosController : ControllerBase
    {
        
    }
}