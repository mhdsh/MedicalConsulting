using System;
using System.Collections.Generic;
using MedicalConsulting.API.Models;

namespace MedicalConsulting.API.Dtos
{
    public class PostForDetailDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }

        public IList<PostPhoto> PostPhotos { get; set; }
    }
}