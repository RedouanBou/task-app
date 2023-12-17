import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Observable, map } from 'rxjs';
import { User } from 'src/app/models/user';

const saltRounds = 10;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';
  private secretKey = 'your_secret_key';

  constructor(private http: HttpClient, private router: Router) { }

  public signIn(userData: any): Observable<User> {
    const usersWithMatchingEmail = this.http.get<User[]>(`${this.apiUrl}?email=${userData.email}`);

    return usersWithMatchingEmail.pipe(
      map(users => {
        const user = users[0];

        if (user && bcrypt.compareSync(user.password, user.password)) {
          const token = this.generateToken(user);
          localStorage.setItem('authToken', token);
          const userWithoutPassword = this.removePassword(user);
          this.router.navigate(['home']);
          return userWithoutPassword;
        } else {
          throw new Error('Ongeldige gebruikersnaam of wachtwoord');
        }
      })
    );
  }

  public signUp(user: any): Observable<User> {
    const hashedPassword = bcrypt.hashSync(user.password, saltRounds);
    const userWithHashedPassword: User = { ...user, password: hashedPassword };
    return this.http.post<User>(this.apiUrl, userWithHashedPassword);
  }

  public signOut() { 
    localStorage.removeItem('authToken');
    this.router.navigate(['login'])
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('authToken')!;
    return user !== null ? true : false;
  }

  private generateToken(user: any): string {
    const payload = { userId: user.id, email: user.email };
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, this.secretKey, options);
  }

  private removePassword(user: any): any {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

}
