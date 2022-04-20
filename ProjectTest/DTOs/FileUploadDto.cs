using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectTest.DTOs
{
    public class FileUploadDto
    {
        public IFormFile File { get; set; }
    }
}
