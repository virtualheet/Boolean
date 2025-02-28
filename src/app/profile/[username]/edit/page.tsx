'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUserProfile } from '@/context/UserContext';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { 
  Save, 
  Upload,
  Plus,
  Trash2
} from 'lucide-react';

interface CustomProfile {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  username: string | null;
  about: string | null;
  socialLinks: string[];
  skills: string[];
  isFreelancer: boolean;
  isClient: boolean;
  contactInfo: string[];
  portfolioProjects: {
    title: string;
    description: string;
    link?: string;
  }[];
}

const ProfilePage = () => {
  const { firstName, lastName, fullName, email, profileImageUrl, loading } = useUserProfile();
  const [customProfile, setCustomProfile] = useState<CustomProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewProfilePhoto, setPreviewProfilePhoto] = useState<string | null>(null);
  
  // New form state for adding items
  const [newSkill, setNewSkill] = useState('');
  const [newSocialLink, setNewSocialLink] = useState('');
  const [newContactInfo, setNewContactInfo] = useState('');

  const parseJsonField = (field: any): string[] => {
    if (Array.isArray(field)) return field;
    try {
      const parsed = JSON.parse(field || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const fetchCustomProfile = async () => {
    try {
      const response = await fetch('/api/users/profile');
      const responseProjects = await fetch('/api/users/portfolio');
      const data = await response.json();
      const dataProjects = await responseProjects.json();
      console.log("User Fetch ::" , data);
      console.log("Projects Fetch ::" , dataProjects);
      setCustomProfile({
        firstName: data.firstName || firstName || null,
        lastName: data.lastName || lastName || null,
        email: data.email || email || null,
        username: data.username || '',
        about: data.about || null,
        socialLinks: parseJsonField(data.socialLinks),
        skills: parseJsonField(data.skills),
        isFreelancer: Boolean(data.isFreelancer),
        isClient: Boolean(data.isClient),
        contactInfo: parseJsonField(data.contactInfo),
        portfolioProjects: Array.isArray(dataProjects) 
          ? dataProjects 
          : [],
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomProfile();
  }, []);

  const handleInputChange = (field: keyof CustomProfile, value: any) => {
    if (!customProfile) return;
    setCustomProfile({
      ...customProfile,
      [field]: value
    });
  };

  // Profile photo handling
  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewProfilePhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      // Here you would typically upload the image to your server
      // For now we're just handling the preview
    }
  };

  // Skills handling
  const handleAddSkill = () => {
    if (!customProfile || !newSkill.trim()) return;
    setCustomProfile({
      ...customProfile,
      skills: [...customProfile.skills, newSkill.trim()]
    });
    setNewSkill('');
  };

  const handleRemoveSkill = (index: number) => {
    if (!customProfile) return;
    const newSkills = [...customProfile.skills];
    newSkills.splice(index, 1);
    setCustomProfile({
      ...customProfile,
      skills: newSkills
    });
  };

  // Social links handling
  const handleAddSocialLink = () => {
    if (!customProfile || !newSocialLink.trim()) return;
    setCustomProfile({
      ...customProfile,
      socialLinks: [...customProfile.socialLinks, newSocialLink.trim()]
    });
    setNewSocialLink('');
  };

  const handleRemoveSocialLink = (index: number) => {
    if (!customProfile) return;
    const newLinks = [...customProfile.socialLinks];
    newLinks.splice(index, 1);
    setCustomProfile({
      ...customProfile,
      socialLinks: newLinks
    });
  };

  // Contact info handling
  const handleAddContactInfo = () => {
    if (!customProfile || !newContactInfo.trim()) return;
    setCustomProfile({
      ...customProfile,
      contactInfo: [...customProfile.contactInfo, newContactInfo.trim()]
    });
    setNewContactInfo('');
  };

  const handleRemoveContactInfo = (index: number) => {
    if (!customProfile) return;
    const newInfo = [...customProfile.contactInfo];
    newInfo.splice(index, 1);
    setCustomProfile({
      ...customProfile,
      contactInfo: newInfo
    });
  };

  // Portfolio projects handling
  const handleAddProject = () => {
    if (!customProfile) return;
    setCustomProfile({
      ...customProfile,
      portfolioProjects: [
        ...customProfile.portfolioProjects,
        { title: '', description: '', link: '' }
      ]
    });
  };

  const handleProjectChange = (index: number, field: 'title' | 'description' | 'link', value: string) => {
    if (!customProfile) return;
    const updatedProjects = [...customProfile.portfolioProjects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setCustomProfile({
      ...customProfile,
      portfolioProjects: updatedProjects
    });
  };

  const handleRemoveProject = (index: number) => {
    if (!customProfile) return;
    const updatedProjects = [...customProfile.portfolioProjects];
    updatedProjects.splice(index, 1);
    setCustomProfile({
      ...customProfile,
      portfolioProjects: updatedProjects
    });
  };

  const handleSubmit = async () => {
    if (!customProfile) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customProfile),
      });

      if (response.ok) {
        await fetchCustomProfile();
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading || profileLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!customProfile) {
    return <div className="flex justify-center items-center min-h-screen">Profile not found</div>;
  }

  return (
    <div className="relative min-h-screen">
      {/* Fixed Save Button - stays visible while scrolling */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={handleSubmit} 
          disabled={saving}
          size="lg" 
          className="shadow-lg flex items-center gap-2"
        >
          <Save className="h-5 w-5" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      
      <div className="mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            
            <div className="space-y-8 ">
              {/* Profile Photo */}
              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-gray-800 ring-4 ring-blue-500/30">
                      <Image
                        src={previewProfilePhoto || profileImageUrl || "/default-avatar.png"}
                        alt="Profile"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    </div>
                    <label className="absolute bottom-0 right-0 cursor-pointer">
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePhotoChange}
                      />
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                        <Upload className="h-4 w-4" />
                      </div>
                    </label>
                  </div>
                  <div className="text-sm text-gray-400">
                    Click the upload button to change your profile photo.
                    <br />
                    Recommended size: 400x400 pixels.
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={customProfile.firstName || ""}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={customProfile.lastName || ""}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customProfile.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={customProfile.username || ""}
                      onChange={(e) => handleInputChange("username", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Additional Information</h3>

                <div className="space-y-2">
                  <Label htmlFor="about">About</Label>
                  <Textarea
                    id="about"
                    value={customProfile.about || ""}
                    onChange={(e) => handleInputChange("about", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Account Type</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="freelancer"
                        checked={customProfile.isFreelancer}
                        onCheckedChange={(checked) => handleInputChange("isFreelancer", checked)}
                      />
                      <label htmlFor="freelancer">Freelancer</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="client"
                        checked={customProfile.isClient}
                        onCheckedChange={(checked) => handleInputChange("isClient", checked)}
                      />
                      <label htmlFor="client">Client</label>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                    />
                    <Button onClick={handleAddSkill} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {customProfile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => handleRemoveSkill(index)}
                          className="text-secondary-foreground/50 hover:text-secondary-foreground"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="space-y-2">
                  <Label>Social Links</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newSocialLink}
                      onChange={(e) => setNewSocialLink(e.target.value)}
                      placeholder="Add a social link"
                      onKeyPress={(e) => e.key === "Enter" && handleAddSocialLink()}
                    />
                    <Button onClick={handleAddSocialLink} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {customProfile.socialLinks.map((link, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input value={link || ""} disabled />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveSocialLink(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-2">
                  <Label>Contact Information</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newContactInfo}
                      onChange={(e) => setNewContactInfo(e.target.value)}
                      placeholder="Add contact information"
                      onKeyPress={(e) => e.key === "Enter" && handleAddContactInfo()}
                    />
                    <Button onClick={handleAddContactInfo} size="icon">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {customProfile.contactInfo.map((info, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input value={info || ""} disabled />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveContactInfo(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Portfolio Projects */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Portfolio Projects</h3>
                  <Button onClick={handleAddProject} variant="outline">
                    Add Project
                  </Button>
                </div>

                <div className="space-y-6">
                  {customProfile.portfolioProjects.map((project, index) => (
                    <div key={index}>
                      <div className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">Project {index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveProject(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Project Title</Label>
                              <Input
                                value={project.title || ""}
                                onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                                placeholder="Enter project title"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Description</Label>
                              <Textarea
                                value={project.description || ""}
                                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                                placeholder="Enter project description"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Project Link</Label>
                              <Input
                                value={project.link || ""}
                                onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                                placeholder="https://"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-4 pb-16">
                <Button
                  variant="outline"
                  onClick={() => window.location.href = `/profile/${customProfile.username}`}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;