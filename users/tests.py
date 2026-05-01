from django.test import TestCase
from django.contrib.auth import get_user_model

# Create your tests here.

User = get_user_model()

class UserTestCase(TestCase):
    def test_hashing(self):
        user = User.objects.create_user(username = "Joe", password = "12345")

        # should return true, if this returns false, that means our stuff is stored in plaintext
        self.assertNotEqual(user.password, "12345")

        # Comparing hasehed version of 12345 with the one stored in our Db
        self.assertTrue(user.check_password("12345"))